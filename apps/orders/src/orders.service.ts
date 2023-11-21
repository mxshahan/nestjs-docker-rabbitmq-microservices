import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async createOrder(payload: CreateOrderRequest) {
    // const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(payload);
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          payload,
        }),
      );

      return order;
    } catch (err) {
      // await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
