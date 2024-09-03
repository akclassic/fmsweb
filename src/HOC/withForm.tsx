import React from 'react';
import { FormikConfig, FormikProps, Formik, FormikHelpers } from 'formik';

interface WithFormProps<Values> extends FormikConfig<Values> {
  //onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
}

const withForm = <Values extends object>(
  WrappedComponent: React.ComponentType<FormikProps<Values>>
) => {
  // return (props: WithFormProps<Values>) => {
  return (props: WithFormProps<Values>) => {
    // const { onSubmit, ...formikProps } = props;
    const { ...formikProps } = props;

    return (
      <Formik {...formikProps}>
        {(formik) => <WrappedComponent {...formik} />}
      </Formik>
    );
  };
};

export default withForm;
