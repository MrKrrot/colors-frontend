import styled from 'styled-components'

export const Form = ({ handler }) => {
    return (
        <FormContainer>
            <Input type='text' placeholder='Search name, hex or rgb' onChange={handler} />
            <Button>Search</Button>
        </FormContainer>
    )
}

const FormContainer = styled.form`
    margin-top: 2em;
    display: flex;
    justify-content: center;
`

const Input = styled.input`
    width: 15em;
    height: 2.5em;
    font-size: 1em;
    border: 2px solid #002244;
    border-radius: 4px;
    padding: 0.5em;
`

const Button = styled.button`
    font-size: 1em;
    margin-left: 1em;
    background-color: #002244;
    border: 1px solid #002244;
    border-radius: 4px;
    width: 6em;
    height: 2.4em;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        color: #002244;
    }
`
