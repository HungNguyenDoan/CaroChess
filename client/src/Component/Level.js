import { Radio, Select } from "antd";

function Level(){
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    return(
        <section>
            <div className="form-box">
                <form>
                    <h2>Thiết lập trận đấu</h2>
                    <div style={{marginBottom:'36px'}}>
                        <label style={{color:'#fff'}}>Độ khó</label>
                        <Select
                        style={{
                        width: 120,
                        marginLeft:'100px'
                        }}
                        onChange={handleChange}
                        options={[
                        {
                            value: 'de',
                            label: 'Dễ',
                        },
                        {
                            value: 'Trung bình',
                            label: 'tb',
                        },
                        {
                            value: 'kho',
                            label: 'Khó',
                        },
                        ]}
                        />
                    </div>
                    <div style={{marginBottom:'36px'}}>
                        <label style={{color:'#fff',marginRight:'100px'}}>Ký hiệu</label>
                        <Radio.Group name="radiogroup">
                            <Radio value={'X'}>X</Radio>
                            <Radio value={'O'}>O</Radio>
                        </Radio.Group>
                    </div>
                    <button>Bắt đầu</button>
                </form>
            </div>
        </section>
    );
}
export default Level