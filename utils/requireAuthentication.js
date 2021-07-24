/* eslint-disable react/display-name */
import { Component } from 'react';
import cookies from 'nookies';
import Router from 'next/router';

const authenticate = (context) => {
  const { token } = cookies.get(context);

  const plannedRoute = { as: context.asPath, href: context.pathname };

  console.log('resolvedUrl', context.resolvedUrl);
  // console.log('getPathname', getPathname(context.resolvedUrl));

  // console.log('resolvedUrl', context.req.url.resolvedUrl);
  // console.log('query', context.req.query);

  // console.log('authenticate context', context);
  // console.log('authenticate plannedRoute', plannedRoute);

  cookies.set(context, 'plannedRoute', context.resolvedUrl, { path: '/' });

  // Checking if cookie is present
  // if it is not present, redirect user to signin page
  if (context.req && !token) {
    console.log('server routing');
    return;
  }

  if (!token) {
    console.log('browser routing');
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
