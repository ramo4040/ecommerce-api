export interface GlobalResponse<T = void> {
	success: boolean;
	status?: number;
	message?: string;
	data?: T;
	error?: string;
}
