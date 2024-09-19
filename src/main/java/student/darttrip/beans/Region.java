package student.darttrip.beans;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 地方情報
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Region {

    // 地方リスト
    private ArrayList<String> regionList = new ArrayList<>();

    // 全国
    private boolean zenkoku;

    // 北海道地方
    private boolean hokkaido;

    // 東北地方
    private boolean tohoku;

    // 関東地方
    private boolean kanto;

    // 近畿地方
    private boolean kinki;

    // 中部地方
    private boolean tyubu;

    // 中国地方
    private boolean tyugoku;

    // 四国地方
    private boolean shikoku;

    // 九州地方
    private boolean kyusyu;

    // 沖縄地方
    private boolean okinawa;
}
