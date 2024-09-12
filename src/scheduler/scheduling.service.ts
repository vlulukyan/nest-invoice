import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry} from "@nestjs/schedule";
import { CronJob } from "cron";
import { ConfigService } from "@nestjs/config";
import { InvoicesService } from "src/invoices/services/invoices.service";
import amqp, { Channel, ChannelWrapper } from "amqp-connection-manager";

@Injectable()
export class SchedulingService implements OnModuleInit {

    private channelWrapper: ChannelWrapper;
    constructor(
        private config: ConfigService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly invoiceService: InvoicesService
    ) {
        const connection = amqp.connect([`amqp://${config.get('RABBITMQ_USER')}:${config.get('RABBITMQ_PASSWORD')}@${config.get('RABBITMQ_HOST')}`]);
        this.channelWrapper = connection.createChannel({
          setup: (channel: Channel) => {
            return channel.assertQueue(config.get('RABBITMQ_QUEUE_NAME'), { durable: true });
          },
        });
    }

    async onModuleInit() {

        console.log('aaa')

        // const job = new CronJob(`* * * * * *`, () => {
        //     this.addToEmailQueue
        // });

        // this.schedulerRegistry.addCronJob('dailyReports', job);

        // job.start();
    }

    async addToEmailQueue() {
        // try {
        //     console.log('bbbbb')
        //     await this.channelWrapper.sendToQueue(
        //         this.config.get('RABBITMQ_QUEUE_NAME'),
        //       Buffer.from(JSON.stringify(this.config.get('EMAIL_USER'))),
        //     );
        //   } catch (error) {
        //     console.log('aaaa')
        //     throw new HttpException(
        //       'Error adding mail to queue',
        //       HttpStatus.INTERNAL_SERVER_ERROR,
        //     );
        //   }
    }

    @Cron(CronExpression.EVERY_SECOND)
    handleCron() {
      this.invoiceService.generateDailyReport()
    }
}
