import React from 'react';

//  styled components
import {
  Animated,
  AddNewPolicy,
  AddNewPolicyOverlay,
  Header,
  Title,
  Content,
  FormField,
  ActionButtons,
} from './styled';

//  custom components
import Button from 'components/common/button';
import Input from 'components/common/input';
import SelectInput from 'components/common/selectinput';

export default ({
  isOpen,
  close
}) => {
  if (isOpen) {
    return (
      <Animated
        isVisible={isOpen}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDuration={500}
        animationOutDuration={500}
      >
        <AddNewPolicyOverlay onClick={close}>
          <AddNewPolicy onClick={e => e.stopPropagation()}>
            <Header>
              <Title>Add New Policy</Title>
            </Header>
            <Content>            
              <FormField pR>
                <SelectInput
                  label="Policy/Quote Status"
                  data={[
                    { label: "Option 1", value: 1 },
                    { label: "Option 2", value: 2 },
                    { label: "Option 3", value: 3 },
                  ]}
                />
              </FormField>

              <FormField pL>
                <Input
                  label="Policy Number/Submission Number"
                />
              </FormField>

              <FormField pR>
                <Input
                  label="Effective Date"
                />
              </FormField>

              <FormField pL>
                <Input
                  label="Expiration Date"
                />
              </FormField>

              <FormField pR>
                <Input
                  label="Writing Company"
                />
              </FormField>

              <FormField pL>
                <Input
                  label="Premium"
                />
              </FormField>

              <FormField pR>
                <Input
                  label="Policy Agent"
                />
              </FormField>

              <FormField pL>
                <Input
                  label="Line of Business"
                />
              </FormField>

              <FormField pR>
                <Input
                  label="Piror Policies"
                />
              </FormField>
            </Content>
            <ActionButtons>
              <Button
                mR
                text="Cancel"
                bgColor="#FFF"
                borderColor="#dc248d"
                textColor="#dc248d"
                onClick={close}
              />
              <Button
                text="Add Now"
                bgColor="#dc248d"
                borderColor="#dc248d"
                textColor="#FFF"
              />
            </ActionButtons>
          </AddNewPolicy>
        </AddNewPolicyOverlay>
      </Animated>
    );
  }

  return null;
};