// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './logout.scss';

class Logout extends React.Component {
  state = {
    authenticated: false,
    username: null,
    error: '',
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
          username: data.username,
        })
      })
  }

  endSession = () => {
    fetch('/api/sessions/logout', safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          this.setState({
            authenticated: false,
            username: null,
          })
        }
      })
      .then (() => {
        window.location.href = '/';
      })
      .catch(error => {
        this.setState({
          error: 'Could not log out.',
        })
      })
  }


  render () {
    const { authenticated, username, error } = this.state;
    if (!authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are not logged in 😞</p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
 
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <p className="mb-0 mb-5 text-center">Are you sure you want to log out {username}?</p>
                <div className="d-grid gap-2 mx-auto">
                  <button className="btn btn-danger" onClick={this.endSession}>Logout</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )   
  }
}

export default Logout;