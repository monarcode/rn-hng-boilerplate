type NotDataProps = {
  activity_workspace_email: boolean;
  activity_workspace_slack: boolean;
  announcements_update_emails: boolean;
  announcements_update_slack: boolean;
  email_digests: boolean;
  email_notifications: boolean;
  mobile_push_notifications: boolean;
  slack_notifications: boolean;
};

const getNotificationSections = (notData?: NotDataProps) => {
  return [
    {
      title: 'Notifications Alert',
      data: [
        {
          id: 'mobile_push_notifications',
          header: 'Mobile push notifications',
          body: 'Receive push notifications on mentions and comments via your mobile app',
          status: notData?.mobile_push_notifications || false,
        },
      ],
    },
    {
      title: 'Email notifications',
      data: [
        {
          id: 'activity_workspace_email',
          header: 'Activity in your workspace',
          body: 'Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes',
          status: notData?.activity_workspace_email || false,
        },
        {
          id: 'email_notifications',
          header: 'Always send email notifications',
          body: 'Receive emails about activity in your workspace, even when you are active on the app',
          status: notData?.email_notifications || false,
        },
        {
          id: 'email_digests',
          header: 'Email digests',
          body: 'Receive email digest every 8 hours for changes to pages you are subscribed to',
          status: notData?.email_digests || false,
        },
        {
          id: 'announcements_update_emails',
          header: 'Announcement and update emails',
          body: 'Receive occasional emails about product launches and new features from notion',
          status: notData?.announcements_update_emails || false,
        },
      ],
    },
  ];
};

export default getNotificationSections;
