export default function Loader({ height = '25px', width = '25px', color = 'white'}: PropTypes) {
  return (
    <div className='loader' style={{ width: width, height: height, border: `2px solid ${color}`, borderBottom: 'transparent'}}></div>
  )
}


interface PropTypes {
  height?: string
  width?: string
  color?: string
}