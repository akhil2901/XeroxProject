import React, { Fragment, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SocialButton from "../components/SocialButton";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../navigation/AuthProvider";

const validation = yup.object({
  email: yup.string("Enter your Email").required("Email is required"),
  password: yup
    .string()
    .required("Please enter a password")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min. 8 characters - uppercase, lowercase , number & symbol"
    ),
  confirmPassword: yup
    .string()
    .required("Please enter a password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min. 8 characters - uppercase, lowercase , number & symbol"
    ),
});
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const { register } = useContext(AuthContext);

  const handleSubmit = (values) => {
    console.log("Values", values);
    setEmail(values.email);
    setPassword(values.password);
    setConfirmPassword(values.confirmPassword);
    if (values.password === values.confirmPassword) {
      register(values.email, values.password);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/LoginBackground.jpeg")}
          style={{ height: hp("100%"), width: wp("100%") }}
        >
          <View style={styles.loginContainer}>
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validation}
              onSubmit={(values, action) => handleSubmit(values)}
              validateOnChange={true}
            >
              {(formikProps) => (
                <Fragment>
                  <View
                    style={{ alignItems: "center", marginBottom: hp("5%") }}
                  >
                    <Text style={{ fontSize: hp("4%") }}>
                      Create an Account
                    </Text>
                  </View>
                  <View>
                    <Input
                      name="email"
                      value={formikProps.values.email}
                      placeholder="Email"
                      onChangeText={formikProps.handleChange("email")}
                      inputStyle={{ fontSize: hp("1.9%") }}
                      placeholderTextColor="#000"
                      inputContainerStyle={styles.input}
                      leftIcon={
                        <Icon type="ionicon" name="mail-outline" size={25} />
                      }
                    />

                    {formikProps.touched.email && formikProps.errors.email && (
                      <View
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Text style={{ color: "red" }}>
                          {formikProps.touched.email &&
                            formikProps.errors.email}
                        </Text>
                      </View>
                    )}

                    <Input
                      name="password"
                      secureTextEntry={showPassword}
                      value={formikProps.values.password}
                      onChangeText={formikProps.handleChange("password")}
                      placeholder="Password"
                      placeholderTextColor="#000"
                      inputContainerStyle={styles.input}
                      inputStyle={{ fontSize: hp("1.9%") }}
                      leftIcon={
                        <Icon
                          type="ionicon"
                          name="lock-closed-outline"
                          size={25}
                        />
                      }
                      rightIcon={
                        <Icon
                          type="ionicon"
                          name={showPassword ? "eye-off" : "eye"}
                          size={25}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      rightIconContainerStyle={{ marginRight: wp("1.5%") }}
                    />
                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <View
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Text style={{ color: "red" }}>
                            {formikProps.touched.password &&
                              formikProps.errors.password}
                          </Text>
                        </View>
                      )}
                    <Input
                      name="confirmPassword"
                      secureTextEntry={showConfirmPassword}
                      value={formikProps.values.confirmPassword}
                      onChangeText={formikProps.handleChange("confirmPassword")}
                      placeholder="Confirm Password"
                      placeholderTextColor="#000"
                      inputContainerStyle={styles.input}
                      inputStyle={{ fontSize: hp("1.9%") }}
                      leftIcon={
                        <Icon
                          type="ionicon"
                          name="lock-closed-outline"
                          size={25}
                        />
                      }
                      rightIcon={
                        <Icon
                          type="ionicon"
                          name={showConfirmPassword ? "eye-off" : "eye"}
                          size={25}
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      }
                      rightIconContainerStyle={{ marginRight: wp("1.5%") }}
                    />
                    {formikProps.touched.confirmPassword &&
                      formikProps.errors.confirmPassword && (
                        <View
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Text style={{ color: "red" }}>
                            {formikProps.touched.confirmPassword &&
                              formikProps.errors.confirmPassword}
                          </Text>
                        </View>
                      )}
                  </View>
                  <View style={{ alignSelf: "center", marginTop: hp("2%") }}>
                    <Button
                      buttonStyle={styles.buttonStyle}
                      title="Sign Up"
                      type="clear"
                      titleStyle={styles.buttonTextStyle}
                      onPress={() => formikProps.handleSubmit()}
                    />
                  </View>
                  <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                      By registering, you confirm that you accept our{" "}
                    </Text>
                    <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
                      <Text
                        style={[styles.color_textPrivate, { color: "#e88832" }]}
                      >
                        Terms of service
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.color_textPrivate}> and </Text>
                    <Text
                      style={[styles.color_textPrivate, { color: "#e88832" }]}
                    >
                      Privacy Policy
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.navButtonText}>
                      Have an account? Sign In
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
  },
  input: {
    paddingLeft: wp("2%"),
    height: hp("6%"),
    width: wp("90%"),
    borderWidth: 1,
    borderRadius: hp("1%"),
  },
  buttonStyle: {
    borderRadius: 10,
    width: wp("80%"),
    height: hp("6%"),
    borderColor: "#808080",
    borderWidth: 1,
  },
  buttonTextStyle: {
    color: "#000",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  forgotButton: {
    marginVertical: hp("3%"),
  },
  navButtonText: {
    marginTop: hp("2%"),
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});
