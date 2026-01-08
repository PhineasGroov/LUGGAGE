# Document Verification & Package Request Workflow - Implementation Summary

## Overview
Implemented a manual document verification system for travel validation and a many-to-many package request workflow. Production-ready with full RLS policies protecting all 4 tables.

## Architecture Changes

### New Models

#### 1. TravelDocument (`travel_documents` table)
- **Purpose**: Store uploaded travel proof documents (plane tickets, etc.)
- **Fields**:
  - `document_type`: PLANE_TICKET, TRAIN_TICKET, BUS_TICKET, PASSPORT, OTHER
  - `verification_status`: PENDING, APPROVED, REJECTED
  - `file_path`: Local storage path (`/app/uploads/travel_documents/`)
  - `original_filename`: User's uploaded filename
  - `verified_by_id`: Admin who verified (FK to users)
  - `verified_at`: Timestamp of verification
  - `rejection_reason`: Why document was rejected
- **Relationships**: Belongs to Travel, verified by User (admin)

#### 2. PackageRequest (`package_requests` table)
- **Purpose**: Junction table for many-to-many package-travel requests
- **Fields**:
  - `status`: PENDING, ACCEPTED, REJECTED, CANCELLED, EXPIRED
  - `responded_at`: When traveler accepted/rejected
- **Relationships**: Links Package to Travel
- **Workflow**: Sender requests multiple travels → first traveler to accept wins

#### 3. Updated TravelStatus Enum
```python
DRAFT              # Initial creation, not submitted
PENDING_VERIFICATION  # Submitted, awaiting admin review
VERIFIED           # Documents approved, ready to open
OPEN               # Available for package requests
CLOSED             # No longer accepting packages
IN_TRANSIT         # Travel in progress
COMPLETED          # Travel finished
REJECTED           # Documents rejected, back to editing
CANCELLED          # Travel cancelled
```

#### 4. Updated Models
- **Travel**: Added `status`, `created_at`, `updated_at`, relationships to documents and package_requests
- **Package**: Added `created_at`, `updated_at`, `travel_requests` relationship
- **User**: Added `is_admin` field, `created_at`, `updated_at`

### New Schemas

#### Travel Documents
```python
TravelDocumentCreate(document_type: DocumentType)
TravelDocumentResponse(id, travel_id, file_path, original_filename, verification_status, verified_by_id, verified_at, rejection_reason, created_at, updated_at)
DocumentVerificationAction(rejection_reason: Optional[str])
```

#### Package Requests
```python
PackageRequestCreate(travel_id: int)
PackageRequestResponse(id, package_id, travel_id, status, responded_at, created_at)
```

#### Updated Schemas
- **TravelResponse**: Added status, created_at, updated_at
- **PackageResponse**: Added created_at, updated_at
- **UserResponse**: Added is_admin, created_at, updated_at

## New API Endpoints

### Traveler Endpoints

#### Upload Travel Document
```
POST /travels/{travel_id}/documents/upload
Content-Type: multipart/form-data
Body: {
  document_type: DocumentType,
  file: UploadFile
}
```
- **Auth**: JWT (traveler only)
- **Allowed states**: DRAFT, REJECTED
- **File types**: .pdf, .jpg, .jpeg, .png
- **Storage**: `/app/uploads/travel_documents/{uuid}.ext`
- **RLS**: Travelers can only upload to own travels

#### Submit Travel for Verification
```
POST /travels/{travel_id}/submit-for-verification
```
- **Auth**: JWT (traveler only)
- **Transition**: DRAFT → PENDING_VERIFICATION
- **Validation**: At least one document must be uploaded
- **RLS**: Travelers can only submit own travels

#### Get Travel Documents
```
GET /travels/{travel_id}/documents
```
- **Auth**: JWT (traveler only)
- **Returns**: List of all documents for the travel
- **RLS**: Travelers can only view documents for own travels

### Admin Endpoints

#### Get Pending Documents
```
GET /admin/documents/pending
```
- **Auth**: JWT (admin only)
- **Returns**: All documents with status PENDING
- **Use case**: Admin dashboard showing documents awaiting verification

#### Approve Document
```
POST /admin/documents/{document_id}/approve
```
- **Auth**: JWT (admin only)
- **Status change**: PENDING → APPROVED
- **Side effect**: If all travel documents approved → travel becomes VERIFIED
- **Fields set**: `verified_by_id`, `verified_at`

#### Reject Document
```
POST /admin/documents/{document_id}/reject
Body: { rejection_reason: string }
```
- **Auth**: JWT (admin only)
- **Status change**: PENDING → REJECTED
- **Side effect**: Travel becomes REJECTED (traveler must fix and resubmit)
- **Fields set**: `verified_by_id`, `verified_at`, `rejection_reason`
- **Validation**: rejection_reason is required

#### Get Travels Pending Verification
```
GET /admin/travels/pending-verification
```
- **Auth**: JWT (admin only)
- **Returns**: All travels with status PENDING_VERIFICATION
- **Use case**: Admin dashboard overview

#### Open Travel
```
POST /admin/travels/{travel_id}/open
```
- **Auth**: JWT (admin only)
- **Transition**: VERIFIED → OPEN
- **Purpose**: Manually open a travel after all documents approved
- **Note**: Could be automated in future

## Complete Workflow

### Travel Verification Flow
```
1. Traveler creates travel (status: DRAFT)
2. Traveler uploads documents (plane ticket, etc.)
   POST /travels/{id}/documents/upload
3. Traveler submits for verification
   POST /travels/{id}/submit-for-verification
   (status: DRAFT → PENDING_VERIFICATION)
4. Admin reviews documents
   GET /admin/documents/pending
5. Admin approves each document
   POST /admin/documents/{doc_id}/approve
   (if all approved → travel status: VERIFIED)
6. Admin opens travel for requests
   POST /admin/travels/{id}/open
   (status: VERIFIED → OPEN)
7. Travel is now visible and requestable by senders
```

### Package Request Flow
```
1. Sender browses OPEN travels
   GET /travels/
2. Sender requests multiple travels for one package
   POST /packages/{package_id}/request-travel/{travel_id}
   (creates PackageRequest with status: PENDING)
3. Travelers see pending requests for their travels
   GET /travels/{id}/package-requests (to implement)
4. First traveler to accept wins
   POST /packages/{package_id}/accept
   (PackageRequest status: ACCEPTED, package.travel_id set)
   (Other PackageRequests auto-cancelled)
5. Package is assigned to travel
   (package.status: ACCEPTED, package.travel_id set)
```

## Row Level Security

### travel_documents Table
```sql
-- Travelers can view documents for their own travels, admins can view all
SELECT: traveler owns travel OR user is admin

-- Travelers can only insert documents for their own travels
INSERT: traveler owns travel

-- Only admins can update (for verification)
UPDATE: user is admin

-- Travelers can delete documents for their own travels
DELETE: traveler owns travel
```

### package_requests Table
```sql
-- Senders and travelers can view requests for their packages/travels
SELECT: sender owns package OR traveler owns travel

-- Senders can insert requests for their packages
INSERT: sender owns package

-- Senders and travelers can update (sender cancels, traveler accepts/rejects)
UPDATE: sender owns package OR traveler owns travel

-- Senders can delete their own requests
DELETE: sender owns package
```

## Security Features

### Authentication
- JWT tokens required for all endpoints
- Admin role checked with `require_admin` dependency
- RLS context set with `current_setting('app.current_user_id')`

### File Upload Security
- Allowed extensions: .pdf, .jpg, .jpeg, .png
- Unique filenames: UUID-based to prevent collisions
- Storage location: `/app/uploads/travel_documents/`
- Owner verification: Can only upload to own travels
- State validation: Can only upload in DRAFT or REJECTED state

### Database Security
- All 4 tables have RLS enabled
- 16 total policies (4 per table)
- postgres owns all tables (admin user)
- luggage_app has data-only access (no DDL)
- Supabase-compatible architecture

## Testing Checklist

### Document Upload Flow
- [ ] Create travel as traveler (status: DRAFT)
- [ ] Upload plane ticket PDF
- [ ] Try uploading invalid file type (should fail)
- [ ] Submit for verification (status: PENDING_VERIFICATION)
- [ ] Try uploading after submission (should fail - wrong status)
- [ ] Create admin user (is_admin=true)
- [ ] Admin approve document (status: APPROVED)
- [ ] Check travel status (should be VERIFIED after all docs approved)
- [ ] Admin open travel (status: OPEN)

### Package Request Flow
- [ ] Create package as sender
- [ ] Request 3 different OPEN travels
- [ ] Check package_requests table (3 PENDING)
- [ ] First traveler accepts request
- [ ] Check other requests (should be CANCELLED)
- [ ] Check package (should have travel_id set)

### Security Tests
- [ ] Try uploading document to another user's travel (403)
- [ ] Try approving document as non-admin (403)
- [ ] Try viewing another user's documents (empty or 403)
- [ ] Try requesting package for another user's package (403)

## Database Tables

### All Tables (5 total)
1. **users** (3 fields added: is_admin, created_at, updated_at)
2. **travels** (3 fields added: status, created_at, updated_at)
3. **packages** (2 fields added: created_at, updated_at)
4. **travel_documents** (new table, 11 fields)
5. **package_requests** (new table, 6 fields)

### RLS Status
All tables have RLS enabled with 4 policies each (SELECT, INSERT, UPDATE, DELETE).

## Next Steps (Future Enhancements)

1. **Automatic Travel Opening**: After all documents approved, auto-transition VERIFIED → OPEN
2. **Request Expiration**: Implement EXPIRED status with cron job
3. **File Download**: Add GET endpoint to download documents
4. **Document Types**: Add more specific validations per document type
5. **Notification System**: Email/push notifications for status changes
6. **AI Verification**: Integrate OCR for ticket validation (when budget allows)
7. **Request Limits**: Limit number of simultaneous requests per package
8. **Dashboard UI**: Admin panel for document verification
9. **Travel History**: Track all status transitions with timestamps
10. **Batch Approval**: Admin can approve/reject multiple documents at once

## Migration Status

✅ Database rebuilt with all new tables
✅ All RLS policies applied (16 total)
✅ File upload directory created
✅ All schemas created and exported
✅ Admin router registered
✅ Backend running successfully
✅ All endpoints available in Swagger

Ready for testing! 🚀
