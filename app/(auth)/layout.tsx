const AuthLayout = ({children}:{children: React.ReactNode}) => {
    return ( 
        <div className="dark:bg-[#292929] h-full flex items-center justify-center">
            {children}
        </div>
     );
}
 
export default AuthLayout;