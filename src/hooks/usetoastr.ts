import { useContext } from 'react';
import { ContextToastify, ToastifyType } from '../components/ToastContainer';

export const useToastr = (): {
	toastr: (text: string, options: Omit<ToastifyType, 'id'>) => void;
	handelCloseToastify: (id: number) => void;
	handelCloseAllToastify: () => void;
} => {
	const { toastr, handelCloseToastify, handelCloseAllToastify } = useContext(ContextToastify);
	return { toastr, handelCloseToastify, handelCloseAllToastify };
};
