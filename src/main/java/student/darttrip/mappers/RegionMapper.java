package student.darttrip.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RegionMapper {
    /**
     * 指定した複数の地方名に対応する県のリストを取得
     * @param regionNames 地方名のリスト
     * @return 県名のリスト
     */
    public List<String> selectByRegions(@Param("regionNames") List<String> regionNames);
}
