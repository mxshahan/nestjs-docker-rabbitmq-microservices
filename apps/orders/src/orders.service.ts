import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async createOrder(payload: CreateOrderRequest) {
    try {
      const order = await this.ordersRepository.create(payload);

      return order;
    } catch (err) {
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
