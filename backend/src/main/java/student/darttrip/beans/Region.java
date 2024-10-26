package student.darttrip.beans;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Beans
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Region {

    // 地方リスト
    private ArrayList<String> regionList = new ArrayList<>();
    // 県リスト
    private ArrayList<String> prefectureList = new ArrayList<>();

    private boolean zenkoku;
    private boolean hokkaido;
    private boolean tohoku;
    private boolean kanto;
    private boolean kinki;
    private boolean tyubu;
    private boolean tyugoku;
    private boolean shikoku;
    private boolean kyusyu;
    private boolean okinawa;
}
