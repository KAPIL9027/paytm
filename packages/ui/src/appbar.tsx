
import { Button } from './button'

interface AppbarProps {
    user?: {
        name?: string | null
    },
    onSignin: any,
    onSignout: any,
    hamburgerIcon?: any,
    handleClick?: any
}
const Appbar = ({
    user,
    onSignin,
    onSignout,
    hamburgerIcon,
    handleClick
}: AppbarProps) => {
  return (
    <div className='w-full py-2 px-4 border-b  flex justify-between'>
      <div className="flex w-52 gap-2 items-center">
      <div className="max-h-fit sm:hidden" onClick={handleClick}>{hamburgerIcon ? hamburgerIcon : <></>}</div>
      <h1 className="text-lg flex flex-col justify-center">PayTM</h1>
      </div>
      
      <Button onClick={user ? onSignout : onSignin}>{user ? 'Logout' : 'Login'}</Button>
    </div>
  )
}

export default Appbar
