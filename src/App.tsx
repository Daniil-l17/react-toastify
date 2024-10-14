import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useToastr } from './hooks/usetoastr';

function App() {
	const [theme, setTheme] = useState<'light' | 'dark' | 'colored'>('colored');
	const { toastr, handelCloseAllToastify } = useToastr();
	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div>
				<p>Theme:</p>
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
					{['colored', 'light', 'dark'].map((color, index) => {
						return (
							<button style={{ backgroundColor: color === theme ? '#1b205a' : '' }} key={index} onClick={() => setTheme(color as 'light' | 'dark' | 'colored')}>
								{color}
							</button>
						);
					})}
				</div>
			</div>
			<div style={{ display: 'flex', gap: '10px' }} className='card'>
				<button onClick={() => toastr('success', { theme: theme as 'colored', type: 'success' })}>success</button>
				<button onClick={() => toastr('info', { theme: theme as 'colored', type: 'info' })}>info</button>
				<button onClick={() => toastr('error', { theme: theme as 'colored', type: 'error' })}>error</button>
				<button onClick={() => toastr('warning', { theme: theme as 'colored', type: 'warning' })}>warning</button>
			</div>
			<div>
				<button style={{ backgroundColor: 'red' }} onClick={handelCloseAllToastify}>
					Clear All
				</button>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
