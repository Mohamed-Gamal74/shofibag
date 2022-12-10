import { Form, Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";
import { motion } from "framer-motion";
import { useUserAuth } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const onFinish = async  (values) => {
    const { email, password, userName } = values;
    try {
      await signUp(email, password, userName);
      toast.success("Account Successfully Registered", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/products");
    } catch (error){
      console.log(error)
      toast.error("User Already Exist!", {
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

        <form-label>User Name</form-label>
        <Form.Item
          className="mb-3 "
          name="userName"
          rules={[
            {
              required: true,

              message: "Please enter your userName!",
            },
          ]}
          hasFeedback
        >
          <Input className={styles.input} />
        </Form.Item>

        <form-label>Password</form-label>

        <Form.Item
          className="mb-3"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            {
              min: 8,
              message: "min length is 8",
            },
          ]}
          hasFeedback
        >
          <Input.Password className={styles.input} />
        </Form.Item>

        <form-label>Confirm Password</form-label>

        <Form.Item
          className="mb-5"
          name="confirmPassword"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered does not match."
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password className={styles.input} />
        </Form.Item>

        <Form.Item className="text-center">
          <button
            type="submit"
            className="w__700  btn text-white mainColorBack w-100"
          >
            Sign up
          </button>
        </Form.Item>
      </Form>
      <ToastContainer limit={2} />
    </motion.div>
  );
};

export default Signup;
