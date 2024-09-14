const AuthLayout = ({children}:{children: React.ReactNode}) => {
    return ( 
        <div className="dark:bg-[#d1d1d1] h-full flex items-center justify-center">
            {children}
        </div>
     );
}
 
export default AuthLayout;