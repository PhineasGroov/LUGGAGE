'use client';

import { List } from 'antd';
import { Package as PackageType } from '@/types/package.types';
import PackageCard from './PackageCard';

interface PackagesListProps {
  packages: PackageType[];
  loading: boolean;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PackagesList({ packages, loading, onView, onEdit, onDelete }: PackagesListProps) {
  return (
    <List
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      pagination={{
        pageSize: 12,
        showSizeChanger: false,
      }}
      dataSource={packages}
      renderItem={(pkg: PackageType) => (
        <List.Item className="border-0! p-0!">
          <PackageCard
            pkg={pkg}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </List.Item>
      )}
    />
  );
}
