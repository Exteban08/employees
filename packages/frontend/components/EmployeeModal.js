import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function EmployeeModal({ employee, refetchEmployees, ...modalProps }) {
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),
    phone: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (employeeData) => {
    updateEmployee({ variables: { id: employee.id, employeeData } })
      .then(res => {
        console.log('🚀 ~ onSubmit ~ res', res);
        refetchEmployees();
      })
      .catch(res => {
        if (res.graphQLErrors) {
          const resErrors = res.graphQLErrors.map((error) => {
            return error.message;
          });
          setGqlErrors(resErrors);
          setError(resErrors[0]);
        }
      })
  }

  return (
    <Modal {...modalProps} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ backgroundColor: 'white', width: '600px', height: 'auto' }}>
        {employee && (
          <React.Fragment>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Username</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} defaultValue={employee.name} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} defaultValue={employee.lastName}  />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} defaultValue={employee.email} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} defaultValue={employee.phone} />
                    <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
                <button disabled={formState.isSubmitting} className="btn btn-primary">
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Login
                </button>
                {errors.apiError &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                }
              </form>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
}

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: Int!, $employeeData: UpdateEmployeeInput!) {
    updateEmployee(id: $id, employeeData: $employeeData) {
      id
      email
      name
      lastName
      nationality
      phone
      civilStatus
      birthday
    }
  }
`;

export default EmployeeModal;
