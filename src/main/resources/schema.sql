--地方マスタのテーブル作成
drop table if exists m_region;

create table m_region (
    region_id int not null comment 'ID',
    region_name varchar(20) comment '地方名',
    prefecture_name varchar(20) comment '県名'
) comment '地方マスタ';