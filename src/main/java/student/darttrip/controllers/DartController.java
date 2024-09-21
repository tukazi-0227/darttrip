package student.darttrip.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import student.darttrip.beans.Region;
import student.darttrip.mappers.RegionMapper;

@RestController
@RequestMapping("/api")
public class DartController {

    @Autowired
    RegionMapper regionMapper;

    // POSTリクエストで地方情報と名前を受け取るエンドポイント
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/regions")
    public Region updateRegions(@RequestBody Region region, HttpSession session) {
        // regionListを取得
        ArrayList<String> regionList = new ArrayList<>();

        // 地方名とフィールドの対応をマップで管理
        Map<String, Boolean> regionMap = new HashMap<>();
        regionMap.put("全国", region.isZenkoku());
        regionMap.put("北海道", region.isHokkaido());
        regionMap.put("東北", region.isTohoku());
        regionMap.put("関東", region.isKanto());
        regionMap.put("中部", region.isTyubu());
        regionMap.put("近畿", region.isKinki());
        regionMap.put("中国", region.isTyugoku());
        regionMap.put("四国", region.isShikoku());
        regionMap.put("九州", region.isKyusyu());
        regionMap.put("沖縄", region.isOkinawa());

        // Trueの地方名をリストに追加
        regionMap.forEach((key, value) -> {
            if (value) {
                regionList.add(key);
            }
        });

        // regionListをセット
        region.setRegionList(regionList);

        // コンソールに表示して確認
        System.out.println("Selected regions: " + regionList);

        session.setAttribute("regionList", regionList);

        return region;
    }

    // Getリクエストで地方情報を取得してランダムな県を返すエンドポイント
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/getDartResult")
    public String dartResult(HttpSession session) {
        // セッションからregionListを取得
        @SuppressWarnings("unchecked")
        List<String> regionNames = (List<String>) session.getAttribute("regionList");

        if (regionNames == null || regionNames.isEmpty()) {
            return "";
        }

        // 複数の地方名に対応する県リストを取得
        List<String> resultList = regionMapper.selectByRegions(regionNames);

        // ランダムに1つの県を選択して返す
        if (!resultList.isEmpty()) {
            Random random = new Random();
            int randomIndex = random.nextInt(resultList.size());
            return resultList.get(randomIndex);
        }

        return "指定された地方に県が存在しません。";
    }
}
