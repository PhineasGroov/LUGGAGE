# Frontend Structure

## Organization

### `/lib/api.ts`
- Axios instance configuration
- Request/Response interceptors
- Token management

### `/types/`
Type definitions for the application:
- `auth.types.ts` - Authentication types
- `user.types.ts` - User profile types
- `package.types.ts` - Package types
- `travel.types.ts` - Travel types
- `index.ts` - Exports all types

### `/services/`
API service layer:
- `auth.service.ts` - Authentication operations
- `user.service.ts` - User profile operations
- `package.service.ts` - Package CRUD operations
- `travel.service.ts` - Travel CRUD operations
- `index.ts` - Exports all services

## Usage

```typescript
// Import services
import { authService, userService, packageService, travelService } from '@/services';

// Import types
import { LoginCredentials, User, Package, Travel } from '@/types';

// Use in components
const login = async (credentials: LoginCredentials) => {
  const response = await authService.login(credentials);
  return response.data;
};
```
