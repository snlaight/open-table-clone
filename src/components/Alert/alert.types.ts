export type AlertType = 'success' | 'default' | 'error' | 'warning';

export type AlertProps = {
    type: AlertType | string;
    message: string;
}

export type AlertListProps = {
    alerts: AlertProps[];
}
