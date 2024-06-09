const AuthLayout = ({children}:{children: React.ReactNode}) => {
    return ( 
        <div className="dark:bg-[#C3FC5E] h-full flex items-center justify-center">
            {children}
        </div>
     );
}
 
export default AuthLayout;