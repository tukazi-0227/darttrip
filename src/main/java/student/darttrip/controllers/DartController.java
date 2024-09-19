package student.darttrip.controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;
import student.darttrip.beans.Region;

@RestController // RestControllerを使うと、すべてのメソッドが自動的に@ResponseBodyになる
@RequestMapping("/api")
public class DartController {

    // POSTリクエストで地方情報と名前を受け取るエンドポイント
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/regions")
    public String updateRegions(@RequestBody Region region) {

        // regionListを取得
        ArrayList<String> regionList = region.getRegionList();

        // 各地方のフィールドがtrueかどうかチェックし、trueならリストに追加
        if (region.isZenkoku()) {
            regionList.add("全国");
        }
        if (region.isHokkaido()) {
            regionList.add("北海道");
        }
        if (region.isTohoku()) {
            regionList.add("東北");
        }
        if (region.isKanto()) {
            regionList.add("関東");
        }
        if (region.isTyubu()) {
            regionList.add("中部");
        }
        if (region.isKinki()) {
            regionList.add("近畿");
        }
        if (region.isTyugoku()) {
            regionList.add("中国");
        }
        if (region.isShikoku()) {
            regionList.add("四国");
        }
        if (region.isKyusyu()) {
            regionList.add("九州");
        }
        if (region.isOkinawa()) {
            regionList.add("沖縄");
        }

        // regionListの内容をコンソールに表示
        System.out.println("Selected regions: " + regionList);

        return "地方情報が正常に受け取られました！";
    }
}
