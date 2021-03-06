import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Scopes,
} from 'sequelize-typescript';

@Scopes(() => {
  return {
    basic: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'deletedBy'],
      },
    },
  };
})
@Table({
  tableName: 'Orders',
  underscored: true,
  paranoid: true,
})
export class Orders extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.INTEGER)
  delivererId: number;

  @Column(DataType.DOUBLE)
  latitude: number;

  @Column(DataType.DOUBLE)
  longitude: number;

  @Column(DataType.STRING)
  order: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.STRING)
  status: string;

  @Column(DataType.INTEGER)
  deletedBy: number;

  @Column(DataType.INTEGER)
  updatedBy: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.DATE)
  deliveredAt: Date;
}
