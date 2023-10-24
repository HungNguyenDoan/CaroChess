import { Link } from "react-router-dom";

function History(){
    return(
        <section>
            <div className="form-box">
                    <div>
                        <div style={{
                            textAlign:'center',
                            fontWeight:'600',
                            fontSize:'24px',
                            marginBottom:'50px'
                        }}>
                        Lịch sử thi đấu
                        </div>
                        <div style={{
                            marginBottom:'50px'
                        }}>    
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ký hiệu</th>
                                        <th>Level</th>
                                        <th>Kết quả</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                </thead>                                 
                            </table>                          
                        </div>
                        <Link to='/home' style={{textDecoration:'none',color:'black'}}>
                        Quay lại
                        </Link>
                    </div>
            </div>
        </section>
    );
}
export default History