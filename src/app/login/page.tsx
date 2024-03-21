import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <main>
      <Header theme="dark" heroBkg={false} hideActionButton={true} />

      <div className="max-w-screen-sm mx-auto">
        <p className="text-5xl font-semibold text-center">Login</p>
        <div className="p-20 bg-[#faefef] mt-20">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
