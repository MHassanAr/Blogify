export type NavVisibility = 'public' | 'auth' | 'admin';

export interface NavItem {
    label: string;
    link: string;
    visibility: NavVisibility;
}