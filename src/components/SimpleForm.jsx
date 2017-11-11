import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from '../../lib/index';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: '',
      hours: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, type, hours } = steps;

    this.setState({ name, type, hours });
  }

  render() {
    const { name, type, hours } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Time Off Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{type.value}</td>
            </tr>
            <tr>
              <td>Hours</td>
              <td>{hours.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Who is taking time off?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'What type off time off is {previousValue} taking?',
            trigger: 'type',
          },
          {
            id: 'type',
            options: [
              { value: 'Vacation', label: 'Vacation', trigger: '5' },
              { value: 'Personal', label: 'Personal', trigger: '5' },
              { value: 'Sick', label: 'Sick', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: `How many hours are they taking off?`,
            trigger: 'hours',
          },
          {
            id: 'hours',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'They have to take off more than 0 hours!';
              } else if (value > 8) {
                return `${value}? They only have 8 hours to take off!`;
              }

              return true;
            },
          },
          {
            id: '7',
            message: `Great! Here's a summary of the time off request.`,
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to edit this request?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: '13' },
              { value: 'type', label: 'Type', trigger: '15' },
              { value: 'hours', label: 'Hours', trigger: '17' },
            ],
          },
          {
            id: '13',
            message: 'Who is taking time off?',
            trigger: 'update-name',
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: '15',
            message: 'What type off time off are they taking?',
            trigger: 'update-type',
          },
          {
            id: 'update-type',
            update: 'type',
            trigger: '7',
          },
          {
            id: '17',
            message: `How many hours are they taking off?`,
            trigger: 'update-hours',
          },
          {
            id: 'update-hours',
            update: 'hours',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Time off submitted successfully!',
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm;
