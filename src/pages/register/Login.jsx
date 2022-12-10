import { Form, Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";
import { motion } from "framer-motion";
import { useUserAuth } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useUserAuth();

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      await logIn(email, password);
      navigate("/products");
    } catch {
      toast.error("Invliad Email or Password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const animation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div variants={animation} initial="hidden" animate="visible">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="p-5  shadow-sm  mt-5  w-75 mx-auto borderRadius"
      >
        <form-label>Email</form-label>
        <Form.Item
          className="mb-3 "
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your Email!",
            },
            {
              type: "email",
            },
          ]}
          hasFeedback
        >
          <Input className={styles.input} />
        </Form.Item>

        <form-label>Password</form-label>
        <Form.Item
          className="mb-5"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className={styles.input} />
        </Form.Item>

        <Form.Item className="text-center">
          <button
            type="submit"
            className=" btn w-100 w__700 mainColorBack text-white"
          >
            Log in
          </button>
        </Form.Item>
      </Form>
      <ToastContainer limit={2} />
    </motion.div>
  );
};

export default Login;
