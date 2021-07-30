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
  email: yup.string("Enter your Email Number").required("Email is required"),
  password: yup
    .string()
    .required("Please enter a password")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Min. 8 characters - uppercase, lowercase , number & symbol"
    ),
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const { login, error } = useContext(AuthContext);

  const onSignIn = (values) => {
    console.log("Values", values);
    setEmail(values.email);
    setPassword(values.password);
    login(values.email, values.password);
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
              }}
              validationSchema={validation}
              onSubmit={(values, actions) => {
                console.log("OnSumbut formik props");
                onSignIn(values);
              }}
              validateOnChange={true}
            >
              {(formikProps) => (
                <Fragment>
                  <View
                    style={{ alignItems: "center", marginBottom: hp("5%") }}
                  >
                    <Text style={{ fontSize: hp("4%") }}>Sign In</Text>
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
                      onBlur={formikProps.handleBlur("email")}
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
                      onBlur={formikProps.handleBlur("password")}
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
                  </View>
                  <View style={{ alignSelf: "center", marginTop: hp("2%") }}>
                    <Button
                      buttonStyle={styles.buttonStyle}
                      title="Login"
                      type="clear"
                      trans
                      color="#c7c7c7"
                      titleStyle={styles.buttonTextStyle}
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                  {error != "" && (
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: hp("2%"),
                      }}
                    >
                      <Text style={{ color: "red", fontSize: hp("2.5%") }}>
                        Invalid Password
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {}}
                  >
                    <Text style={styles.navButtonText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  {Platform.OS === "android" ? (
                    <View>
                      <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => fbLogin()}
                      />
                      <SocialButton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => googleLogin()}
                      />
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text style={styles.navButtonText}>
                      Don't have an acount? Create here
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%"),
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
  },
  input: {
    paddingLeft: wp("2%"),
    height: hp("6 %"),
    width: wp("90%"),
    borderWidth: 1,
    borderRadius: hp("1%"),
  },
  buttonStyle: {
    borderRadius: 10,
    width: wp("80%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "#808080",
  },
  buttonTextStyle: {
    color: "#000",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
});

export default Login;
