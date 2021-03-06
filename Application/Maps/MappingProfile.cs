using System.Linq;
using Application.Activities;
using Application.Dtos;
using Application.Maps;
using AutoMapper;
using Domain;

namespace Application.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
            
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(p => p.Author.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(p => p.Author.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(p => p.Author.Photos.FirstOrDefault(i => i.IsMain).Url));
        }
    }
}