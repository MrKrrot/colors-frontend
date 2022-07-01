import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form } from './components/Form'
import { useApi } from './hooks/useApi'

const App = () => {
    const [data, setData] = useState('')
    const [query, setQuery] = useState('')

    const handleQuery = e => {
        setQuery(e.target.value.toLowerCase())
    }

    const getData = async () => {
        const res = await useApi('http://localhost:5000/v1/colors')
        setData(res)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Form handler={handleQuery} />
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
                        data
                            .filter(color => {
                                return (
                                    color.name.toLowerCase().includes(query) ||
                                    color.hex.toLowerCase().includes(query) ||
                                    color.rgb.toLowerCase().includes(query)
                                )
                            })
                            .map(({ name, hex, rgb, families }) => {
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
                            <Column>Loading...</Column>
                        </Row>
                    )}
                </tbody>
            </Table>
        </>
    )
}

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
