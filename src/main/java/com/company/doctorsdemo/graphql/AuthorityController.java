package com.company.doctorsdemo.graphql;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.company.doctorsdemo.security.Authority;
import com.company.doctorsdemo.security.AuthorityDto;
import com.company.doctorsdemo.security.AuthorityMapper;
import com.company.doctorsdemo.security.AuthorityRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class AuthorityController {
    private final AuthorityRepository crudRepository;
    private final AuthorityMapper mapper;

    public AuthorityController(AuthorityRepository crudRepository, AuthorityMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @MutationMapping(name = "deleteAuthority")
    @Transactional
    @Secured("ROLE_ADMIN")
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Authority entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "authorityList")
    @Transactional(readOnly = true)
    @Secured("ROLE_ADMIN")
    @NonNull
    public ResultPage<AuthorityDto> findAll(
            @Argument AuthorityFilter filter,
            @Argument("sort") List<AuthorityOrderByInput> sortInput,
            @Argument("page") OffsetPageInput pageInput
    ) {
        Specification<Authority> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Authority> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent().stream().map(mapper::toDto).collect(Collectors.toList()), pageData.getTotalElements());
    }

    @QueryMapping(name = "authority")
    @Transactional(readOnly = true)
    @Secured("ROLE_ADMIN")
    @NonNull
    public AuthorityDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateAuthority")
    @Transactional
    @Secured("ROLE_ADMIN")
    @NonNull
    public AuthorityDto update(@Argument @NonNull AuthorityDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        Authority entity = new Authority();
        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    protected Sort createSort(List<AuthorityOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case NAME:
                            return Sort.Order.by("name").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class AuthorityOrderByInput {
        private AuthorityOrderByProperty property;
        private SortDirection direction;

        public AuthorityOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(AuthorityOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {
        ASC,
        DESC
    }

    public enum AuthorityOrderByProperty {
        NAME
    }

    protected Specification<Authority> createFilter(AuthorityFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.name != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + filter.name.toLowerCase() + "%"));
                }
                if (filter.description != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + filter.description.toLowerCase() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class AuthorityFilter {
        private String name;
        private String description;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}