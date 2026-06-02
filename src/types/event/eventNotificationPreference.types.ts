// User notification preferences
export interface EventNotificationPreferences {
  email: {
    enabled: boolean;
    eventInvites: boolean;
    eventUpdates: boolean;
    eventReminders: boolean;
    dailyAgenda: boolean;
    weeklyDigest: boolean;
    eventCancellations: boolean;
    responseUpdates: boolean;
  };
  push: {
    enabled: boolean;
    eventReminders: boolean;
    eventInvites: boolean;
    eventUpdates: boolean;
    upcomingEvents: boolean;
    conflictAlerts: boolean;
  };
  desktop: {
    enabled: boolean;
    eventReminders: boolean;
    eventStarting: boolean;
    conflictAlerts: boolean;
    showPreview: boolean;
  };
  sms: {
    enabled: boolean;
    eventReminders: boolean;
    urgentUpdates: boolean;
    phoneNumber?: string;
  };
}

export const defaultEventNotificationPreferences: EventNotificationPreferences =
  {
    sms: {
      enabled: true,
      phoneNumber: "",
      urgentUpdates: true,
      eventReminders: true,
    },
    desktop: {
      enabled: true,
      showPreview: true,
      eventStarting: true,
      eventReminders: true,
      conflictAlerts: true,
    },
    push: {
      enabled: true,
      eventInvites: true,
      eventUpdates: true,
      eventReminders: true,
      upcomingEvents: true,
      conflictAlerts: true,
    },
    email: {
      enabled: true,
      dailyAgenda: true,
      eventInvites: true,
      eventUpdates: true,
      weeklyDigest: true,
      eventReminders: true,
      responseUpdates: true,
      eventCancellations: true,
    },
  };
