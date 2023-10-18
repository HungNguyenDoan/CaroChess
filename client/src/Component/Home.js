import { Button } from "antd";
import "./css/style.css";
function Home(){
    return(
        <section>
            <div className="form-box">
                <form>
                    <h2>Cờ caro</h2>
                    <div>
                        <Button className="button1">Chơi</Button>
                        <Button className="button1">Lịch sử thi đấu</Button>
                        <Button className="button1">Bảng xếp hạng</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default Home