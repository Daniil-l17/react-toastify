import { FC, useEffect, useRef, useState } from 'react';
import { ToastifyType } from '../ToastContainer';
import { motion } from 'framer-motion';
import { useToastr } from '../../hooks/usetoastr';
import { $Toastify, $ToastifyProgress, $ToastifyText } from './style';

export const Toastify: FC<{ item: ToastifyType }> = ({ item }) => {
	const { handelCloseToastify } = useToastr();
	const refInterval = useRef<number>(0);
	const refMouseToastify = useRef<HTMLDivElement | null>(null);
	const [progress, setprogress] = useState(100);
	const [mouseOver, setMouseOver] = useState(false);

	useEffect(() => {
		if (!mouseOver) {
			refInterval.current = setInterval(() => {
				setprogress(prev => {
					if (prev === 0) {
						handelCloseToastify(item.id!);
						clearInterval(refInterval.current);
						return prev;
					}
					return prev - 2;
				});
			}, 100);
		}
		return () => {
			clearInterval(refInterval.current);
		};
	}, [mouseOver]);

	useEffect(() => {
		const handelMouseOver = () => {
			setMouseOver(true);
			clearInterval(refInterval.current);
		};
		const handelMouseOut = () => {
			setMouseOver(false);
		};
		if (refMouseToastify.current) {
			refMouseToastify.current.addEventListener('mouseover', handelMouseOver);
			refMouseToastify.current.addEventListener('mouseleave', handelMouseOut);
		}
		return () => {
			removeEventListener('mouseover', handelMouseOver);
			removeEventListener('mouseleave', handelMouseOut);
		};
	}, []);

	return (
		<motion.div ref={refMouseToastify} initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ x: 300 }} transition={{ duration: 0.4 }}>
			<$Toastify type={item.type!} theme={item.theme!}>
				<$ToastifyText onClick={() => handelCloseToastify(item.id!)}>{item.text}</$ToastifyText>
				<$ToastifyProgress progress={progress} />
			</$Toastify>
		</motion.div>
	);
};
