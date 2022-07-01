import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useApi } from './hooks/useApi'

const App = () => {
    const [data, setData] = useState('')

    const getData = async () => {
        const res = await useApi('http://localhost:5000/v1/colors')
        setData(res)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Form>
                <Input type='text' placeholder='Buscar color' />
                <Button>Buscar</Button>
            </Form>
            <Table>
                <Caption>Colors</Caption>
                <thead>
                    <Row>
                        <ColumnHead as='th'>Color Name</ColumnHead>
                        <ColumnHead as='th'>Color Code HEX</ColumnHead>
                        <ColumnHead as='th'>Color Code RGB</ColumnHead>
                        <ColumnHead as='th'>Color Families</ColumnHead>
                    </Row>
                </thead>
                <tbody>
                    {data ? (
                        data.map(({ name, hex, rgb, families }) => {
                            return (
                                <Row key={name} color={hex}>
                                    <Column>{name}</Column>
                                    <Column>{hex}</Column>
                                    <Column>{rgb}</Column>
                                    <Column>
                                        <ul>
                                            {families.map(family => (
                                                <li key={`${name}-${family}`}>{family}</li>
                                            ))}
                                        </ul>
                                    </Column>
                                </Row>
                            )
                        })
                    ) : (
                        <Row>
                            <Column>Cargando...</Column>
                        </Row>
                    )}
                </tbody>
            </Table>
        </>
    )
}

const Form = styled.table`
    margin: 2em auto;
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

const Table = styled.table`
    margin: 2em auto;
    border: 2px solid #333;
    border-collapse: collapse;
`

const Caption = styled.caption`
    font-size: 2em;
    font-weight: 700;
`

const Column = styled.td`
    padding: 0.6em;
    border-spacing: collapse;
`

const ColumnHead = styled(Column)`
    font-size: 1.2em;
    background-color: #333;
    color: #fff;
`

const Row = styled.tr`
    font-weight: 600;
    background-color: ${props => props.color};
    color: ${props => (props.color === '#000000' ? '#FFF' : '#000')};
`

export default App
