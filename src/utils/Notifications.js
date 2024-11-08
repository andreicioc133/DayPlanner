import notifee, {TriggerType} from '@notifee/react-native';
import moment from 'moment';

export async function createTriggerNotification(startTime, isAllDay, title) {
  const date = moment(new Date(startTime));
  const triggerDate = moment(new Date(startTime)).subtract(15, 'minutes');
  const isAllDayTriggerDate = moment(new Date(startTime)).set({
    hour: 8,
    minute: 0,
  });

  // Create a channel
  //   const channelId = await notifee.createChannel({
  //     id: 'Default',
  //     name: 'Default-Channel',
  //     importance: AndroidImportance.HIGH,
  //   });

  if (
    isAllDay === true &&
    moment(date).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD')
  ) {
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(isAllDayTriggerDate).getTime(),
    };
    await notifee.createTriggerNotification(
      {
        title: title,
        body: `Today, all day!`,
      },
      trigger,
    );
    return;
  }

  // Create a time-based trigger
  if (triggerDate > new Date()) {
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date(triggerDate).getTime(),
    };

    console.log('entered here');

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: title,
        body: `Today at ${moment(date).format('HH:mm')}.`,
      },
      trigger,
    );
  }
}
