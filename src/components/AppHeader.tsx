import { useClock } from "../hooks/useClock";
import { useStore } from "../store/store";
import { UserMenu } from "./UserMenu";

export const AppHeader = () => {
  const clock = useClock();
  const { username } = useStore();
	return (
		<div className='sticky top-0 z-50 flex h-14 items-center justify-between border-b border-b-cyan-600 bg-white text-xl text-header-text shadow-xl'>
			<div className='flex items-center justify-center gap-10'>
				<img className='pl-5' src="/logoWithTitle.svg" alt='' />
				<h1>Scrum Poker - SeeTrue SW Iteration Planning</h1>
			</div>
			<div className='flex items-center justify-center gap-5 mx-3'>
				{clock}
				<UserMenu />
			</div>
		</div>
	);
};