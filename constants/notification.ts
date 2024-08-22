const notificationSections = [
  {
    title: 'Notifications Alert',
    data: [
      {
        header: 'Mobile push notifications',
        body: 'Receive push notifications on mentions and comments via your mobile app',
        status: false,
      },
    ],
  },
  {
    title: 'Email notifications',
    data: [
      {
        header: 'Activity in your workspace',
        body: 'Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes',
        status: false,
      },
      {
        header: 'Always send email notifications',
        body: 'Receive emails about activity in your workspace, even when you are active on the app',
        status: true,
      },
      {
        header: 'Email digests',
        body: 'Receive email digest every 8 hours for changes to pages you are subscribed to',
        status: false,
      },
      {
        header: 'Announcement and update emails',
        body: 'Receive occasional emails about product launches and new features from notion',
        status: true,
      },
    ],
  },
];

export default notificationSections;
