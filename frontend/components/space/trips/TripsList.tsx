'use client';

import { List } from 'antd';
import { Travel } from '@/types/travel.types';
import TripCard from './TripCard';

interface TripsListProps {
  travels: Travel[];
  loading: boolean;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TripsList({ travels, loading, onView, onEdit, onDelete }: TripsListProps) {
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
      dataSource={travels}
      renderItem={(travel: Travel) => (
        <List.Item className="border-0! p-0!">
          <TripCard
            travel={travel}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </List.Item>
      )}
    />
  );
}
