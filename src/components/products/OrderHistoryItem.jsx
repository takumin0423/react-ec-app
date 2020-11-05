import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextDetail from '../generic/TextDetail';
import OrderedProducts from './OrderedProducts';

export const datetimeToString = (date) => {
  return date.getFullYear() + '-'
      + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('00' + date.getDate()).slice(-2) + ' '
      + ('00' + date.getHours()).slice(-2) + ':'
      + ('00' + date.getMinutes()).slice(-2) + ':'
      + ('00' + date.getSeconds()).slice(-2);
};

export const dateToString = (date) => {
  return date.getFullYear() + '-'
      + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('00' + date.getDate()).slice(-2);
};

const OrderHistoryItem = (props) => {
  const order = props.order;
  const price = `¥${order.amount.toLocaleString()}`;
  const orderedDatetime = datetimeToString(order.updatedAt.toDate());
  const shippingDate = dateToString(order.shippingDate.toDate());

  return (
      <div>
        <div className="small-space"/>
        <TextDetail label={'注文ID'} value={order.id}/>
        <TextDetail label={'注文日時'} value={orderedDatetime}/>
        <TextDetail label={'発送予定日'} value={shippingDate}/>
        <TextDetail label={'注文金額'} value={price}/>
        {order.products.length > 0 && (
            <OrderedProducts products={order.products}/>
        )}
        <div className="extra-small-space"/>
        <Divider/>
      </div>
  );
};

export default OrderHistoryItem;