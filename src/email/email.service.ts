import { Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Job } from 'bull';

@Injectable()
export class EmailSenderService   
 {
  private transporter: nodemailer.Transporter<any>;   


  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),   

        pass: this.configService.get('EMAIL_PASSWORD'),   

      },
    });
  }

  @Process('daily_sales_report')
  async sendEmail(job: Job) {
    const report = job.data;

    console.log('send mail')

    // Create an email template using your preferred templating engine
    const emailTemplate = `
      <h2>Daily Sales Summary</h2>
      <p>Total Sales: ${report.totalSales}</p>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          ${report.perItemSales.map((item) => `
            <tr>
              <td>${item.sku}</td>
              <td>${item.totalQuantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const mailOptions = {
      from: 'your-email@example.com',
      to: 'recipient@example.com',
      subject: 'Daily Sales Summary',
      html: emailTemplate,
    };

    await this.transporter.sendMail(mailOptions);
  }
}