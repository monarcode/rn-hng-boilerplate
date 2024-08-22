type NotSettingsResponse = {
  id: string;
  user_id: string;
  mobile_push_notifications: boolean;
  activity_workspace_email: boolean;
  email_notifications: boolean;
  email_digests: boolean;
  announcements_update_emails: boolean;
  activity_workspace_slack: boolean;
  slack_notifications: boolean;
  announcements_update_slack: boolean;
};

type NotSettingsResponseError = {
  data: string;
  error: string;
  message: string;
  status_code: number;
};

export { NotSettingsResponse, NotSettingsResponseError };
