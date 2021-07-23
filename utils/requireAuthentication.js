/* eslint-disable react/display-name */
import { Component } from 'react';
import cookies from 'nookies';
import Router from 'next/router';

const authenticate = (context) => {
  const { token } = cookies.get(context);

  cookies.set(context, 'plannedRoute', JSON.stringify({ as: context.asPath, href: context.pathname }), { path: '/' });

  // Checking if cookie is present
  // if it is not present, redirect user to signin page
  if (context.req && !token) {
    return;
  }

  if (!token) {
    Router.push('/signin');
  }

  return token;
};

const isAuthenticated = (context) => {
  const { token } = cookies.get(context);

  return token;
};

const requireAuthentication = (gssp) => {
  return async (context) => {
    const { req, res } = context;
    const token = authenticate(context);

    if (!token) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/signin',
          statusCode: 302,
        },
      };
    }

    const result = await gssp(context); // Continue on to call `getServerSideProps` logic

    return { ...result, props: { ...result.props, token } };
  };
};

export { requireAuthentication, isAuthenticated };
