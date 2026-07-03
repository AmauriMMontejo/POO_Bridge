namespace NotificationsBridge {
    interface NotificationChannel {
        send(messafe: string): void;
    }

    class emailchannel implements NotificationChannel {
        send(message: string): void {
            console.log(`Enviando notificacion por correo electronico : ${message}`);
        }
    }

    class smschannel implements NotificationChannel {
        send(message: string): void {
            console.log(`Enviando notificacion por SMS: ${message}`);
        }
    }

    class pushnotification implements NotificationChannel {
        send(message: string): void {
            console.log(`Enviando notificacion por push: ${message}`);
        }
    }

    class whatsappchannel implements NotificationChannel{
        send(message: string): void {
            console.log(`Enviando notificacion por whatsapp: ${message}`);
        }
    }

    abstract class Notification {
        protected channel: NotificationChannel;

        constructor(channel: NotificationChannel) {
            this.channel = channel;
        }

        setchannel(channel: NotificationChannel): void {
            this.channel = channel;
        }

        abstract notify(message: string): void;
    }

    class AlertNotification extends Notification {
        override notify(message: string): void {
            console.log("Notification - Alert");
            this.channel.send(message);
        }
    }

    class reminderNotification extends Notification {
        override notify(message: string): void{
            console.log("Notification -  Reminder");
            this.channel.send(message);
        }
    }

    function main() {
        const alert = new AlertNotification(new emailchannel());

        alert.notify("Alert! Has been detected an access non Authorized");

        alert.setchannel(new smschannel());
        alert.notify("Alert! Has been detected an access non Authorized");

        const reminder = new reminderNotification(new smschannel());

        reminder.notify("Reminder! Meeting at 3PM");

        reminder.setchannel(new pushnotification());
        reminder.notify("Reminder! Meeting at 3PM");

        alert.setchannel(new whatsappchannel());
        alert.notify("You have 1 missed call...");
    }

    main();
}