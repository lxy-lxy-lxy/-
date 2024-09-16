import { Form, Input, Modal, Select, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新增汇率"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="原币种"
      >
        {form.getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请选择币种！',
            },
          ],
        })(
          <Select
            placeholder="请选择"
            style={{
              width: '100%',
            }}
          >
            <Option value="USD">美元</Option>
            <Option value="CNY">人民币</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="目标币种"
      >
        {form.getFieldDecorator('aims', {
          rules: [
            {
              required: true,
              message: '请选择币种！',
            },
          ],
        })(
          <Select
            placeholder="请选择"
            style={{
              width: '100%',
            }}
          >
            <Option value="USD">美元</Option>
            <Option value="CNY">人民币</Option>
          </Select>,
        )}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="汇率"
      >
        {form.getFieldDecorator('callNo', {
          rules: [
            {
              required: true,
              message: '请输入汇率！',
            },
          ],
        })(
          <InputNumber
            style={{
              width: '100%',
            }}
            min={0}
            step={0.1}
            onChange={onChange}
          />,
        )}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="有效时间"
      >
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          style={{
            width: '100%',
          }}
          onChange={DateChange}
        />
      </FormItem>
    </Modal>
  );
};
function onChange(value) {
  console.log('changed', value);
}
function DateChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
}
export default Form.create()(CreateForm);
